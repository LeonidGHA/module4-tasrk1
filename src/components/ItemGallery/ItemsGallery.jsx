import { useState, useEffect, useCallback } from "react";

const ItemsGallery = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const fetchRespose = useCallback(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${page}/albums`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setItems((prevItems) => (page > 1 ? [...prevItems, ...data] : data));
      })
      .catch(console.error);
  }, [page]);

  useEffect(() => {
    fetchRespose();
  }, [fetchRespose]);

  return (
    <div>
      <ul>
        {items.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
      <button type="button" onClick={() => setPage(page + 1)}>
        Load more
      </button>
    </div>
  );
};

export default ItemsGallery;
// class ItemsGallery extends Component {
//   state = {
//     items: [],
//     page: 1,
//   };

//   componentDidMount() {
//     this.fetchRespose();
//   }

//   componentDidUpdate(_, prevState) {
//     const { page } = this.state;
//     if (page !== prevState.page) {
//       this.fetchRespose();
//     }
//   }

//   fetchRespose() {
//     const { page } = this.state;
//     fetch(`https://jsonplaceholder.typicode.com/users/${page}/albums`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);

//         this.setState((prevState) => ({
//           items: page > 1 ? [...prevState.items, ...data] : data,
//         }));
//       })
//       .catch(console.error);
//   }

//   render() {
//     const { items } = this.state;

//     return (
//       <div>
//         <ul>
//           {items.map(({ id, title }) => (
//             <li key={id}>{title}</li>
//           ))}
//         </ul>
//         <button
//           type="button"
//           onClick={() =>
//             this.setState((prevState) => ({ page: prevState.page + 1 }))
//           }
//         >
//           Load more
//         </button>
//       </div>
//     );
//   }
// }
