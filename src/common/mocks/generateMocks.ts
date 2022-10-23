import { faker } from '@faker-js/faker'
import fs from 'fs'
import path from 'path'
import moment from 'moment'

const makeArray = <T>(length: number, generator: () => T): T[] =>
  Array.from({ length }, generator)

const organizations = makeArray(3, () => ({
  _id: faker.database.mongodbObjectId(),
  name: faker.company.name(),
}))

const organizationsWithDeviceIds = organizations.map((organizations) => {
  const organizationDeviceIds = makeArray<string>(3, () =>
    faker.database.mongodbObjectId()
  )
  return {
    ...organizations,
    deviceIds: organizationDeviceIds,
  }
})

const generateDevice = (organizationId: string, deviceId: string) => ({
  organizationId: organizationId,
  _id: deviceId,
  l: faker.address.streetAddress(),
  n: faker.commerce.productName(),
})

const generateEnergy = () => {
  const energyIn = faker.datatype.float({
    min: 50,
    max: 60,
  })
  const energyOut = faker.datatype.float({ min: 0, max: 40 })
  const energyDiff = Math.min(Math.abs(energyIn - energyOut))

  return {
    ein: Number(energyIn.toPrecision(2)),
    eout: Number(energyDiff.toPrecision(2)),
  }
}

const devices = organizationsWithDeviceIds
  .map((organization) =>
    organization.deviceIds.map((deviceId) =>
      generateDevice(organization._id, deviceId)
    )
  )
  .flat(1)

const energyWithDevices = devices
  .map((device) => {
    const dateSequence: string[] = []
    const currentDate = moment()
    let startDate = moment(currentDate).subtract(100, 'days')
    do {
      dateSequence.push(moment(startDate).format('YYYY-MM-DD'))
      startDate = moment(startDate).add(1, 'days')
    } while (startDate <= currentDate)

    const sequence = dateSequence.map((date) => ({ ts: date, _id: device._id }))
    return sequence.map((row) => ({
      ...row,
      ...generateEnergy(),
    }))
  })
  .flat()

const generateMocks = () => {
  const data = {
    organizations: organizationsWithDeviceIds,
    energy: energyWithDevices,
  }
  fs.writeFileSync(
    path.join(process.cwd(), 'src/common/mocks/data.json'),
    JSON.stringify(data, null, '\t')
  )
}

generateMocks()
