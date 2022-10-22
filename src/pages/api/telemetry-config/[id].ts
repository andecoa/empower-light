import { NextApiRequest, NextApiResponse } from 'next'
import { mongoAPI } from '../config'
import type { TelemetryConfig } from '../../../common/types'

const getTelemetryConfig = async (deviceId: string) => {
  const response = await mongoAPI<{ documents: TelemetryConfig[] }>({
    method: 'post',
    data: {
      collection: 'dev_config',
      database: 'e2t_iot',
      dataSource: 'Cluster0',
      filter: {
        _id: deviceId + '.telemetry2',
      },
    },
  })
  return response.data.documents[0]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string
  try {
    const data = await getTelemetryConfig(id)
    if (data === undefined) {
      return res.status(404).json({ error: 'Device not found' })
    }
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'failed to load data' })
  }
}
