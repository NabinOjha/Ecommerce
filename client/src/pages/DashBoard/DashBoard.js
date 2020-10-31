import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './DashBoard.scss';
import userImage from './../../assets/images/image.jpg';
import ProductTable from './../../components/ProductsTable/ProductTable';
import CreateProduct from '../../components/Form/CreateProduct/CreateProduct';
import CreateCategory from '../../components/Form/CreateCategory/CreateCategory';
import { logout } from './../../redux/actions/action';

const DashBoard = ({ currentUser }) => {
  const [content, setContent] = useState('ProductTable');
  const [editProdId, setEditProdId] = useState(null);

  const { location } = useHistory();
  const prodId = location.state && location.state.prodId;
  const activeContent = location.state && location.state.activeContent;

  useEffect(() => {
    if (prodId) {
      setActiveContent(activeContent, prodId);
    }
  }, [prodId, activeContent]);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const setActiveContent = (activeContent, prodId) => {
    setContent(activeContent);
    setEditProdId(prodId);
  };

  const renderContent = () => {
    switch (content) {
      case 'ProductTable':
        return (
          <ProductTable
            setContent={setActiveContent}
            currentUser={currentUser}
          />
        );
      case 'Create-Product':
        return <CreateProduct setContent={setContent} />;
      case 'Sales-report':
        return <ProductTable />;
      case 'Add-category':
        return <CreateCategory />;
      case 'Edit-product':
        return <CreateProduct setContent={setContent} id={editProdId} />;
      default:
        return (
          <ProductTable
            setContent={setActiveContent}
            currentUser={currentUser}
          />
        );
    }
  };

  return (
    <div className='dashboard'>
      <aside className='user'>
        <div className='user__details'>
          <img className='user__image' src={userImage} alt='user' />
          <h3 className='user__name'>{currentUser && currentUser.username}</h3>
        </div>
        <ul className='user__actions-list'>
          <li
            className='user__actions-item'
            onClick={() => setContent('ProductTable')}
          >
            Products
          </li>
          <li
            className='user__actions-item'
            onClick={() => {
              setContent('Create-Product');
            }}
          >
            Create Product
          </li>
          <li
            className='user__actions-item'
            onClick={() => setContent('Sales-report')}
          >
            Sales Report
          </li>
          <li
            className='user__actions-item'
            onClick={() => setContent('Add-category')}
          >
            Create category
          </li>
          <li className='user__actions-item' onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </aside>
      <div className='content'>{renderContent()}</div>
    </div>
  );
};

export default DashBoard;
