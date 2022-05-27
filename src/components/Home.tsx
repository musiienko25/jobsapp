import React, { useEffect, useState } from 'react';
import { useSort, HeaderCellSort } from '@table-library/react-table-library/sort';
import Modal from './Modal'
import '../App.css';
import {
  Header,
  HeaderRow,
  Table,
  HeaderCell,
  Body,
  Row,
  Cell,
} from '@table-library/react-table-library';
import  { useNavigate }  from 'react-router-dom';

interface Person {
  company_name: string
  created_at: number
  description: string
  job_types: any
  location: string
  remote: boolean
  slug: string
  tags: any
  title: string
  url: string
}

function Home() {
  const navigate = useNavigate();
  const [dataUser, setdataUser] = useState<any>([])
  const [search, setSearch] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<any>();

  const handleSearch = (event:any) => {
    console.log(typeof(event))
    setSearch(event.target.value);
  };
    // its just for library hooks
    // @ts-ignore

  const sort = useSort(dataUser, null, {
    sortFns: {
      NAME: (array) =>
        array.sort((a, b) => a.company_name.localeCompare(b.company_name)),
    },
  });

  useEffect(() => {
    fetch('https://www.arbeitnow.com/api/job-board-api')
      .then((res) => res.json())
      .then((data) => {
        setdataUser(data.data);
      });
  }, []);

  useEffect(() => {
    console.log(dataUser)
  }, [dataUser]);

  const userNodes:any = {nodes: dataUser.filter((item:Person) =>
    (item.company_name.toLowerCase().includes(search.toLowerCase()) || 
    item.slug.toLowerCase().includes(search.toLowerCase()) ||
    item.location.toLowerCase().includes(search.toLowerCase()) ||
    item.title.toLowerCase().includes(search.toLowerCase())
    )
  ),
}

  const handleClick = (id:any, slug:any) => {
    console.log(id)
    console.log(dataUser)
    // @ts-ignore
    dataUser.find(e => {
      if (e.url === id) {
        console.log(e)
        setModalInfo(e)
        setModal(true)

        navigate(`/post/${slug}`, {
            state: e
        });
      }

    })
  }

  return (
    <>
      {/* {modal && <Modal modalInfo={modalInfo}/>} */}
      <label htmlFor="search">
        Search by Name:
        <input id="search" type="text" onChange={handleSearch} />
      </label>

      <Table data={userNodes && userNodes} sort={sort}>
        {(tableList) => (
          <>
          <Header>
            <HeaderRow>
              <HeaderCellSort sortKey="NAME">Name</HeaderCellSort>
              <HeaderCell>Slug</HeaderCell>
              <HeaderCell>Location</HeaderCell>
              <HeaderCell>Title</HeaderCell>
            </HeaderRow>
          </Header>

          <Body className="table__body">
              {tableList.map((item) => (
                <Row key={item.url} item={item} onClick={() => handleClick(item.url, item.slug)}>
                  <Cell>{item.company_name}</Cell>
                  <Cell>
                    {item.slug}
                  </Cell>
                  <Cell>{item.location}</Cell>
                  <Cell>{item.title}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </>
  );
}

export default Home;


