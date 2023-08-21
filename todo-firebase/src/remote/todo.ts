import { Todo } from '@/model/todo';

import { COLLECTIONS } from '@/constants/collection';
import { addDoc, collection, deleteDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { fireStore } from './firebase';

export async function getTodos() {
 const query =  collection(fireStore, COLLECTIONS.TODOS)
 const snapshot = await getDocs(query)
  return snapshot.docs.map((doc)=> doc.data() as Todo)
}

export function postTodo(todo: Todo) {
  return addDoc(collection(fireStore, COLLECTIONS.TODOS), todo)
}

export async function updateTodo(todo: Todo) {
  const snapshot = await getDocs(query(collection(fireStore, COLLECTIONS.TODOS), where('id', '==', todo.id)))

  if(snapshot.docs[0] === null){
    return
  }

  return updateDoc(snapshot.docs[0].ref, {
    todo: todo.todo
  })
}

export async function deleteTodo(id: string) {
  const snapshot = await getDocs(query(collection(fireStore, COLLECTIONS.TODOS), where('id', '==', id)))

  if(snapshot.docs[0] === null){
    return
  }

  return deleteDoc(snapshot.docs[0].ref)
}
