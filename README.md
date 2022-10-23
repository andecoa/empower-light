## Instructions

- generate mock data `yarn generate-mocks`
- run dev api that uses mock data `yarn dev-server`
- run frontend `yarn dev`

## Notes

- This is not connected to a real backend but this has API routes that allow us to do so (we just need to configure it)
- There are some type errors and inconsistencies between the real schemas and our mock data
- Avoid commit errors (related to type errors) with `git commit --no-verify -m "..."`
