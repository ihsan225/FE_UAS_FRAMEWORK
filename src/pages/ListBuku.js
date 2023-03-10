import { React, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Img from '../assets/product/book.png';
// import { STORAGE_URL } from '../utility/Url';



export default function ListBook() {
  const [data, setData] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    fetchListBook();
  }, [])
  const fetchListBook = async (e) => {
    let token = sessionStorage.getItem("access_token");
    fetch("http://127.0.0.1:8000/api/get_book", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    }).then((res) => res.json())
      .then((json) => {
        setData(json.book);
      },
        (error) => {
          alert(error);
        }
      );
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className='col-11'>
        {/* <div md={12}><Button onClick={() => history('/addbook')}>Tambah</Button></div> */}
        <Row className='d-flex justify-content-center pe-4 ps-4 '>
          {data.map(data =>
            <Col key={data.id} className="p-4 col-lg-3 col-md-6 col-sm-8 col-11">
              <Card>
                <Card.Img variant="top" src={Img} width="100" height="200" alt=" " />
                <Card.Body>
                  <Card.Title className='text-secondary text-uppercase'>{data.judul_buku}</Card.Title>
                  <Card.Text className='text-secondary'>
                    {data.genre_buku}
                  </Card.Text>
                  <Button variant="primary" href='/transaksi'>Sewa</Button>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </div>
  )
}
