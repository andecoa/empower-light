import { NextApiRequest, NextApiResponse } from 'next'
import { mongoAPI } from '../config'

type Energy = {
  _id: string
  ts: string
  ein: number
  eout: number
}

const getEnergy = async (deviceId: string, dateStr: string) => {
  const response = await mongoAPI<{ documents: Energy[] }>({
    method: 'post',
    data: {
      collection: 'energy',
      database: 'e2t_iot',
      dataSource: 'Cluster0',
      filter: {
        _id: { $regex: deviceId + '.' + dateStr },
      },
    },
  })
  return response.data.documents
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string
  const date = req.query.date as string

  try {
    const data = await getEnergy(id, date)
    if (data === undefined) {
      return res.status(404).json({ error: 'Device not found' })
    }
    if (data.length === 0) {
      return res.status(404).json({ error: `No data for the date ${date}` })
    }
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'failed to load data' })
  }
}
