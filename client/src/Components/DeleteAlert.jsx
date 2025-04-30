import React from 'react'

const DeleteAlert = ({content,onDelete}) => {
  return (
    <div>
        <p>{content}</p>
        <div className='flex justify-end mt-6'>
            <button className='add-btn add-btn-fill' onClick={onDelete} type="button">
                Delete 
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert