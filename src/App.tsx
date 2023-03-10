// import { useState } from 'react';
import './App.css';
import Layout from './components/Layout';
// import Navigator from './components/Navigator';
// import DecisionTreeFlow from './components/Tree';

function App() {
  // const navigator = Navigator({ setTextId: function () { }, navbarHeight: 76 });  // TODO: update this
  // const decisionTreeFlow = DecisionTreeFlow();
  // const [activeContainer, setActiveContainer] = useState(navigator)
  // const updateActiveContainer = (id: number) => {
  //   switch (id) {
  //     case 0:
  //       if (activeContainer !== navigator)
  //         setActiveContainer(navigator);
  //       break;

  //     case 1:
  //       if (activeContainer !== decisionTreeFlow)
  //         setActiveContainer(decisionTreeFlow);
  //       break;
  //     default:
  //       if (activeContainer !== navigator)
  //         setActiveContainer(navigator);
  //       break;
  //   }

  // }
  return (
    <div className="App">
      <Layout setActiveContainer={()=>{}}>
      </Layout>
    </div>
  );
}

export default App;
