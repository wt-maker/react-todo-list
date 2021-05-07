import React, { useState, useEffect } from 'react';
import { Tabs, Spin } from 'antd';
import TodoInput from './todo-input';
import TodoList from './todo-list';
import { fetchTodos, toggleTodo } from './api';
import { useRequest, useWithLoading } from './hook'
import 'antd/dist/antd.css';
import './style/reset.css'
import './style/style.css'

const { TabPane } = Tabs

const TAB_ALL = 'all';
const TAB_FINISHED = 'finished';
const TAB_UNFINISHED = 'unfinished';

const tabMap = {
  [TAB_ALL]: "全部",
  [TAB_FINISHED]: "已完成",
  [TAB_UNFINISHED]: "未完成"
}
function App() {

  const [activeTab, setActiveTab] = useState(TAB_ALL);

  const [query, setQuery] = useState("")

  const {
    loading: listLoading,
    data: { result: todos = [] }
  } = useRequest(()=>{
    return fetchTodos({ tab: activeTab, query });
  }, [activeTab, query])

  const [placeholder, setPlaceholder] = useState("");
  useEffect(() => {
    setPlaceholder(`在${tabMap[activeTab]}内搜索`);
  }, [activeTab])

  const { func: onToggleFinished, loading: toggleLoading } = useWithLoading(
    async id => {
      await toggleTodo(id)
    }
  )

  const loading = !!listLoading || !!toggleLoading

  return (
    <>
      <Tabs defaultActiveKey={activeTab} onChange={setActiveTab}>
        <TabPane tab={tabMap[TAB_ALL]} key={TAB_ALL} />
        <TabPane tab={tabMap[TAB_FINISHED]} key={TAB_FINISHED} />
        <TabPane tab={tabMap[TAB_UNFINISHED]} key={TAB_UNFINISHED} />
      </Tabs>
      <div className="app-wrap">
        <h1 className="app-title">Todo List</h1>
        <TodoInput placeholder={placeholder} setQuery={setQuery} />
        <Spin spinning={loading} tip="稍等片刻">
          <TodoList todos={todos} onToggleFinished={onToggleFinished}></TodoList>
        </Spin>
      </div>
    </>  
  );
}

export default App;
