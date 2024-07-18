import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [models, setmodels] = useState([]);
  const [filteredmodels, setFilteredmodels] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Athenasis23/api/main/api.json')
      .then(response => response.json())
      .then(data => {
        setmodels(data);
        setFilteredmodels(data.modelos);
      });
  }, []);

  const filtermodels = categoria => {
    if (categoria === 'todos') {
      setFilteredmodels(models);
    } else {
      const filtered = models.filter(model => model.categoria === categoria);
      setFilteredmodels(filtered);
    }
    setFilter(categoria);
  };

  return (
    <div className="App">
      <h1>Filtrar modelos por categoria</h1>
      <div>
        <button onClick={() => filtermodels('todos')} className="Back todos">Todos</button>
        <button onClick={() => filtermodels('Supermodel')} className="Back Supermodel">Supermodel</button>
        <button onClick={() => filtermodels('Runway Model')} className="Back RunwayModel">Runway Model</button>
        <button onClick={() => filtermodels('High Fashion Model')} className="Back HighFashionModel">High Fashion Model</button>
      </div>
      
      <h2>Modelos:</h2>
      <table>
        {filter && filteredmodels.length > 0 ? (
          filteredmodels.map((model, index) => (
            <tr key={index}>
              <td> Nome: {model.nome} <br></br> Idade: {model.idade} <br></br> Categoria: {model.categoria} </td>
            </tr> 
          ))
        ) : (
          <p>Nenhuma modelo encontrada.</p>
        )}
      </table>
    </div>
  );
}

export default App;
