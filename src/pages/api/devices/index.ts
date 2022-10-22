import { NextApiRequest, NextApiResponse } from 'next'
import { mongoAPI } from '../config'
import type { Device } from '../../../common/types'

const getAllDevices = async () => {
  const response = await mongoAPI<{ documents: Device[] }>({
    method: 'post',
    data: {
      collection: 'dev_config',
      database: 'e2t_iot',
      dataSource: 'Cluster0',
      filter: {
        _id: {
          $regex: '.scada',
        },
      },
      projection: {
        _id: 1,
        n: 1,
        l: 1,
      },
      sort: {
        _id: 1,
      },
    },
  })
  return response.data.documents
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await getAllDevices()
    res.status(200).json({ data })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'failed to load data' })
  }
}
