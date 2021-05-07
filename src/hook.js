import { useState, useEffect } from 'react';
export const useRequest = (fn, dependencies) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)

  const request = () => {
    let cancle = false;
    setLoading(true);
    fn().then(res => {
        if (!cancle) {
          setData(res)
        }
      }).catch(()=>{
        if (!cancle) {
          setError(error)
        }
      })
      .finally(()=>{
        if (!cancle) {
          setLoading(false);
        }
      });

      return () => {
        cancle = true;
      };
  };

  useEffect(() => {
    const cancleRequest = request();
    return () => {
      cancleRequest();
    }
  }, dependencies);
  return {
    data,
    setData,
    error,
    loading,
    request
  };
};

export const useWithLoading = fn => {
  const [loading, setLoading] = useState(false);
  const func = (...args) => {
    setLoading(true);
    return fn(...args).finally(()=>{
      setLoading(false)
    });
  };
  return {
    loading,
    func
  };
};