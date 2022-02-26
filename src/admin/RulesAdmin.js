import React, { useEffect, useState } from 'react';
import { getSystemRules } from './api';

const RulesAdmin = () => {
  const [rules, setRules] = useState();
  useEffect(() => {
    const effect = async () => {
      const systemRules = await getSystemRules();
      setRules(systemRules);
    }
    effect();


  }, [])
  return (
    <div>
      <table>
        <thead>

          <tr>
            <td>name</td>
            <td>type</td>
            <td>default value</td>         
          </tr>
        </thead>        
        <tbody>
          {rules && rules.map((r, i) => {
            const { name, type, defaultValue } = r.data();
            return <tr key={i}>
              <td>
                {name}
              </td>
              <td>
                {type}
              </td>
              <td>
                {defaultValue}
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RulesAdmin