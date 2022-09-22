import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/puppies`

async function create(puppy) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(puppy)
    })
    return res.json()
  } catch (error) {
    throw error
  }
}

async function getAll() {
  const res = await fetch(BASE_URL)
  return res.json()
}

async function deleteOne(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  })
  return res.json()
}

async function update(puppy) {
  const res = await fetch(`${BASE_URL}/${puppy._id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(puppy)
  })
  return res.json()
}

async function addPhoto(photoData, puppyId) {
  const res = await fetch(`${BASE_URL}/${puppyId}/add-photo`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: photoData
  })
  return await res.json()
}

export {
  create,
  getAll,
  deleteOne,
  update,
  addPhoto
}