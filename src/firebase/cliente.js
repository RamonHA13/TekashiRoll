import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { getFirestore, where, addDoc, collection, getDocs, query, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth'

export const firebaseConfig = {
  apiKey: 'AIzaSyB0htp67z_v0chFqQsigjMHSCmEsjzhjlU',
  authDomain: 'sushiroll-69aa2.firebaseapp.com',
  projectId: 'sushiroll-69aa2',
  storageBucket: 'sushiroll-69aa2.appspot.com',
  messagingSenderId: '357418357015',
  appId: '1:357418357015:web:94f5a7254dd5f437bee752',
  measurementId: 'G-42YB25443M'

}

export const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore(app)
const storage = getStorage()

export function userLogin ({ email, password }) {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password)
    })
    .catch((error) => {
      console.error(error)
    })
}

export async function uploadProductImage (file, nombre) {
  const storageRef = ref(storage, 'productos/' + nombre)

  await uploadBytes(storageRef, file)

  const url = await getDownloadURL(storageRef)

  return url
}
export async function getSubcategoriasByCategoriaId (id) {
  const subcategorias = []
  const docRef = doc(db, 'categorias', id)

  try {
    const docSnap = await getDoc(docRef)
    const querySnapshot = docSnap.data().Subcategorias
    querySnapshot.map(async (subcategoria) => {
      const subCategoriaDoc = await getDoc(subcategoria)
      subcategorias.push({ id: subcategoria.id, data: subCategoriaDoc.data() })

      return subcategorias
    })

    return subcategorias
  } catch (e) {
    console.error(e)
    return subcategorias
  }
}
export async function getCategorias () {
  const q = query(collection(db, 'categorias'))
  const categorias = []
  try {
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach(doc => categorias.push({ id: doc.id, data: doc.data() }))

    return categorias
  } catch (e) {
    console.error(e)
    return categorias
  }
}

export async function getProductos () {
  const q = query(collection(db, 'productos'))
  const productos = []
  try {
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => productos.push({ id: doc.id, data: doc.data() }))
    return productos
  } catch (e) {
    console.error(e)
    return productos
  }
}
export async function getProductById (id) {
  const docRef = doc(db, 'productos', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    console.log('El documento no existe')
  }
}

export async function deleteProductById (id) {
  console.log('here')
  await deleteDoc(doc(db, 'productos', id))
}
export async function editProductById ({ id, data }) {
  const productoRef = doc(db, 'productos', id)
  try {
    const docRef = await updateDoc(productoRef, data)
    return docRef
  } catch (e) {
    console.error(e)
  }
}
export async function addProduct ({ nombre, precio, categoria, subcategoria, imgUrl, descripcion }) {
  try {
    const docRef = await addDoc(collection(db, 'productos'), {
      nombre,
      precio,
      categoria,
      subcategoria,
      imgUrl,
      descripcion
    })
    return docRef
  } catch (e) {
    console.error(e)
  }
}
export function createUser ({ name: nombres, lastNames: apellidos, email, password }) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const userId = userCredential.user.uid
      const correo = userCredential.user.email
      console.log('here1')
      addUser(userId, nombres, apellidos, correo)
      setPersistence(auth, browserSessionPersistence)
        .catch((error) => {
          console.error('error2', error)
        })
    })
    .catch(e => console.error(e))
}

export async function addUser (userId, nombres, apellidos, correo, rol = 'cliente') {
  console.log('here2')
  try {
    const docRef = await addDoc(collection(db, 'usuarios'), {
      userId,
      nombres,
      apellidos,
      correo,
      rol
    })
    return docRef
  } catch (error) {
    console.error(error)
  }
}
export async function getPersistanceId () {
  return auth.currentUser.uid
}

export async function getIsAdmin () {
  const q = query(collection(db, 'usuarios'), where('rol', '==', 'admin'))
  const querySnapshot = await getDocs(q)
  const admins = []
  querySnapshot.forEach((doc) => {
    admins.push(doc.data())
  })
  return admins
}
