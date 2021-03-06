import { useEffect, useState, SyntheticEvent } from 'react';
import { useSort, HeaderCellSort } from '@table-library/react-table-library/sort';
import './styles.home.scss';
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
import { Input, Text } from "@nextui-org/react";
import {api} from '../api/api';

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

  const handleSearch = (event:any) => {
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
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setdataUser(data.data);
      })
      .catch((e) => {
        console.log(e)
      })
      ;
  }, []);

  const userNodes:any = {nodes: dataUser.filter((item:Person) =>
    (item.company_name.toLowerCase().includes(search.toLowerCase()) || 
    item.slug.toLowerCase().includes(search.toLowerCase()) ||
    item.location.toLowerCase().includes(search.toLowerCase()) ||
    item.title.toLowerCase().includes(search.toLowerCase())
    )
  ),
}
  console.log(userNodes)

  const handleClick = (id:string, slug:string) => {
    // @ts-ignore
    dataUser.find(e => {
      if (e.url === id) {
        navigate(`/post/${slug}`, {
            state: e
        });
      }
    })
  }

  return (
    <div className='home'>
      <label htmlFor="search">
        <div className='home__search'>
            <Text size={18} weight="bold"> Search:</Text> 
            <Input id="search" type="text" onChange={handleSearch} placeholder="Search" />
        </div>
      </label>

      <Table data={userNodes && userNodes} sort={sort}>
        {(tableList) => (
          <div className='home__table'>
          <Header >
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
                    {item.slug.length > 14 ? `${item.slug.slice(0, 18)}...` : null}
                  </Cell>
                  <Cell>{item.location}</Cell>
                  <Cell>{item.title.length > 14 ? `${item.title.slice(0, 18)}...` : null}</Cell>
                </Row>
              ))}
            </Body>
          </div>
        )}
      </Table>
    </div>
  );
}

export default Home;


