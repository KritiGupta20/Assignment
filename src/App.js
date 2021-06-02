import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [isBottom, setBottom] = useState(false)
  const [pages, setPages] = useState(0)
  const getPosts = () => {
    console.log(1)
    fetch("https://www.scoopwhoop.com/api/v4/read/all/?offset=0&limit=8").then((res) => res.json()).then((result) => setPosts([...posts,...result.data]))
  }
  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    // return {
    // document.removeEventListener('scroll', handleScroll);
    // }
    return () => {document.removeEventListener('scroll', handleScroll);}
     }, [])
     const  handleScroll = (event) =>  {
      const element = document.getElementById('list');
      if (!isBottom && isBottomReached(element)) {
        getPosts()
        setBottom(true)
      }
      if (!isBottomReached(element)) {
        setBottom(false)
      }
   }
const    isBottomReached = (element) => {
      return element.getBoundingClientRect().bottom <= window.innerHeight;
   }
  useEffect(() => {

    getPosts()}, [])
    
  return (
    <div className="App">
      <div id="list" onScroll={handleScroll} style={{ background: "lightblue" }}>
{posts.map((item, index) => {
 return(
  <div className="column" key={index}>
    <div className="card">
      <h3>{item.title}</h3>
      <p>{item.category?.join(",").toUpperCase()}</p>
      <p>{`${item.pub_date} | ${item.readtime}`}</p>
    </div>
  </div>)

  
},this)}
</div>

{/* <div class="row">
  <div class="column">
    <div class="card">
      <h3>Card 1</h3>
      <p>Some text</p>
      <p>Some text</p>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <h3>Card 2</h3>
      <p>Some text</p>
      <p>Some text</p>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <h3>Card 3</h3>
      <p>Some text</p>
      <p>Some text</p>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <h3>Card 4</h3>
      <p>Some text</p>
      <p>Some text</p>
    </div>
  </div>
</div> */}


    </div>
  );
}

export default App;
