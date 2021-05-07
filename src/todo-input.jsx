import React, { useState } from 'react';
import { Input } from 'antd';

const TodoInput = ({ setQuery, placeholder }) => {
  const [value, setValue] = useState('');
  const onAdd = () => setQuery(value);

  return (
    <section className="input-wrap">
      <Input
        onPressEnter={onAdd}
        value={value}
        onChange={e => setValue(e.target.value)}
        className="input"
        placeholder={placeholder}
      >
      </Input>
    </section>
  )
}

export default TodoInput