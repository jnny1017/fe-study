/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'

import { Todo } from '@/model/todo'
import Button from '../Shared/Button'
import TextField from '../Shared/TextField'

const list = css`
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px solid #64c364;
`

const item = css`
  position: relative;
  padding-left: 8px;
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 8px;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #000;
    transform: translate(-50%, -50%);
  }

  label {
    flex: 1;
  }
`

interface Props {
  todos: Array<Todo>
  onEdit: (id: string, newValue: string) => void
  onDelete: (id: string) => void
}

export default function TodoList({ todos, onEdit, onDelete }: Props) {
  const [newValue, setNewValue] = useState('')
  const [selectedIndex, setSelectedIndex] = useState("-1")

  const handleUpdate = (id: string) => {
    if (newValue === '') {
      alert('할 일을 입력해주세요')
      return
    }

    onEdit(id, newValue)
    setSelectedIndex("-1")
    setNewValue('')
  }

  const handleEdit = (id: string) => {
    setSelectedIndex(id)
  }

  return (
    <ul css={list}>
      {todos.map(({ todo, id }) => {
        return (
          <li key={id} css={item}>
            {selectedIndex === id ? (
              <>
                <TextField
                  id="newtodo"
                  placeholder={todo}
                  value={newValue}
                  onChange={(event) => setNewValue(event.target.value)}
                />

                <Button children="확인" onClick={() => handleUpdate(id)} />
              </>
            ) : (
              <>
                {todo}
                <Button children="수정" onClick={() => handleEdit(id)} />
              </>
            )}
            <Button
              variant="outlined"
              children="삭제"
              onClick={() => onDelete(id)}
            />
          </li>
        )
      })}
    </ul>
  )
}
