import React from 'react';
import { List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames';


const TodoList = ( {todos, onToggleFinished} ) => {

  const onDeleteHandle = (id) => {
    console.log('删除')
  }

  return (
    <div className="list-wrap">
      {todos.length === 0 ? (
        <p>暂无待办事项</p>
      ) : (
        <List
          dataSource={todos}
          renderItem={({id, text, finished}, idx) => {

            const className = classNames({
              "list-item": true,
              "list-item__finished": finished
            })

            return (
              <List.Item className={className}>
                <div onClick={() => onToggleFinished(id)} className="list-item-wrap">
                  <span>{text}</span>
                  <DeleteOutlined onClick={()=> onDeleteHandle(id)}/>
                </div>
              </List.Item>
            )
          }}
        >

        </List>
      )}
    </div>
  )
};

export default TodoList;