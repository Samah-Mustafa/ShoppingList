import React, {useState} from 'react';
import AllLists from '../lists/AllLists';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Redirect} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact';

const Dashboard = ({lists, auth}) => {
  console.log(lists);
  const [AllList, setAllList] = useState(lists);
  function compareTitleAsc(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.title.toUpperCase();
    const bandB = b.title.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  function compareTitleDesc(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.title.toUpperCase();
    const bandB = b.title.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = -1;
    } else if (bandA < bandB) {
      comparison = 1;
    }
    return comparison;
  }
  function compareTimeAsc(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.createdAt;
    const bandB = b.createdAt;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = -1;
    } else if (bandA < bandB) {
      comparison = 1;
    }
    return comparison;
  }
  function compareTimeDesc(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.createdAt;
    const bandB = b.createdAt;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  const sort = (e) => {
    if (e.target.id === 'TitleAsc') {
      setAllList(lists.slice().sort(compareTitleAsc));
    } else if (e.target.id === 'TitleDesc') {
      setAllList(lists.slice().sort(compareTitleDesc));
    } else if (e.target.id === 'TimeDesc') {
      console.log('hi');
      console.log(lists.slice().sort(compareTimeDesc));
      setAllList(lists.slice().sort(compareTimeDesc));
    } else {
      setAllList(lists.slice().sort(compareTimeAsc));
    }
  };
  if (auth.uid) {
    return (
      <div>
        <div>
          <MDBDropdown>
            <MDBDropdownToggle caret color='primary'>
              MDBDropdown
            </MDBDropdownToggle>
            <MDBDropdownMenu basic>
              <MDBDropdownItem id='TitleAsc' onClick={sort}>
                A-Z
              </MDBDropdownItem>
              <MDBDropdownItem id='TitleDesc' onClick={sort}>
                Z-A
              </MDBDropdownItem>
              <MDBDropdownItem divider />
              <MDBDropdownItem id='TimeAsec' onClick={sort}>
                New to old
              </MDBDropdownItem>

              <MDBDropdownItem id='TimeDesc' onClick={sort}>
                {' '}
                Old to new
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </div>
        <AllLists key={uuidv4()} lists={AllList || lists} />
      </div>
    );
  } else {
    return <Redirect to='/signin' />;
  }
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    lists: state.firestore.ordered.lists,
    auth: state.firebase.auth,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect(() => [
    {
      collection: 'lists',
    },
  ])
)(Dashboard);
