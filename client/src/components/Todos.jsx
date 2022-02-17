import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodo,
  fetchTodos,
  patchStatus,
  updateTodo,
} from "../store/actionCreator";
import "./Todos.css";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBContainer,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdbreact";
import { buttons } from "../assets/buttonList";

export default function Todos() {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState("");
  const [status] = useState("uncompleted");
  const [editTodo, setEditTodo] = useState({});
  const [filterData, setFilterData] = useState("");
  const [filterCategory, setFilterCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleStatusTodo = async (id) => {
    const payload = {
      status: "completed",
    };
    await dispatch(patchStatus(id, payload));
  };

  const handleGetUpdateTodo = (e) => {
    const { value } = e.target;
    setItem(value);
    setEditTodo({
      ...editTodo,
      item: value,
    });
  };

  const handleSubmitUpdateTodo = async () => {
    toggle(false);
    await dispatch(updateTodo(editTodo));
  };

  const handleDeleteTodo = async (id) => {
    await dispatch(deleteTodo(id));
  };

  const toggle = async (payload) => {
    setModal(payload.id);
    setEditTodo(payload);
  };

  const searchText = (e) => {
    const { value } = e.target;
    setFilterData(value);
  };

  
  function buttonFilter(category) {
    return todos.filter(el => el.category === category);
  }
  
  const handleCategory = (e) => {
    const { value } = e.target;
    value !== "all"
    ? setFilterCategory(buttonFilter(value))
    : setFilterCategory(todos)
  };
  
  let dataSearch = filterCategory.filter((el) => {
    return el.item.toLowerCase().includes(filterData.toLowerCase());
  });

  return (
    <div>
      {loading ? (
        <div>
          <MDBContainer>
            <img src={require("../assets/loading.jpg")} />
          </MDBContainer>
        </div>
      ) : (
        <div className="container mt-5">
          <div className="container">
            <MDBCol md="6">
              <form className="form-inline mt-4 mb-4">
                <MDBIcon icon="search" />
                <input
                  className="form-control form-control-sm ml-3 w-75"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  value={filterData}
                  onChange={searchText}
                />
              </form>
            </MDBCol>
            <MDBCol md="6">
              {buttons &&
                buttons.map((type, index) => (
                  <>
                    <button
                      key={index}
                      className="btn btn-primary"
                      onClick={handleCategory}
                      value={type.value}
                    >
                      {type.name}
                    </button>
                  </>
                ))}
            </MDBCol>
          </div>

          <MDBRow className="row">
            {dataSearch.map((el) => {
              return (
                <MDBCol className="col-md-4 mb-4" key={el.id}>
                  <MDBCard className="card text-center ">
                    <MDBCardHeader className="card-header bg-primary text-white todo-row ">
                      <MDBRow className="row align-items-center">
                        <MDBCol className="d-flex align-items-start flex-column">
                          <MDBIcon
                            className="mb-auto p-2 fa-2x black-text"
                            icon="tasks"
                          />
                          <MDBCol>
                            <h5>Category :</h5>
                            <MDBCardTitle>{el.category}</MDBCardTitle>
                          </MDBCol>
                          <MDBRow className="p-2">
                            <MDBIcon
                              onClick={(e) => {
                                e.preventDefault();
                                handleStatusTodo(el.id);
                              }}
                              className="p-1 fa-2x"
                              icon="check-double"
                            />
                            <MDBIcon
                              onClick={(e) => {
                                e.preventDefault();
                                toggle(el);
                              }}
                              className="p-1 fa-2x"
                              icon="edit"
                            />
                            <MDBIcon
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeleteTodo(el.id);
                              }}
                              className="p-1 fa-2x"
                              icon="trash"
                            />
                          </MDBRow>
                        </MDBCol>
                        <MDBCol>
                          <h3 className="display-3">{el.id}</h3>
                          <MDBCardTitle>{el.status}</MDBCardTitle>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardHeader>
                    <MDBCardText>
                      <h5 className="text-primary">{el.item}</h5>
                    </MDBCardText>
                  </MDBCard>

                  <MDBContainer>
                    <MDBModal isOpen={modal} color="secondary">
                      <MDBModalHeader toggle={toggle}>
                        Edit your Todo
                      </MDBModalHeader>
                      <MDBModalBody>
                        {
                          <MDBInput
                            value={editTodo.item}
                            type="text"
                            onChange={handleGetUpdateTodo}
                            label="Add New Todo"
                          />
                        }
                      </MDBModalBody>
                      <MDBModalFooter>
                        <MDBIcon
                          color="primary"
                          className="p-1 fa-2x"
                          onClick={(e) => {
                            e.preventDefault();
                            toggle(false);
                          }}
                          icon="times"
                        />
                        <MDBIcon
                          color="primary"
                          className="p-1 fa-2x"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSubmitUpdateTodo();
                          }}
                          icon="save"
                        />
                      </MDBModalFooter>
                    </MDBModal>
                  </MDBContainer>
                </MDBCol>
              );
            })}
          </MDBRow>
        </div>
      )}
    </div>
  );
}
