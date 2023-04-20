export default function createEditData (data) {
  let editedData = {}
  for (const value in data) {
    if (!data[value]) continue

    if (data[value].length && data[value].length > 0) {
      editedData = {
        ...editedData,
        [value]: data[value]
      }
    }
  }

  return editedData
}
