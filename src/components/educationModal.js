import '../customcss.css'
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import OneExpModal from './oneExpModal'
import AddExpModal from './addToExpModal';

const Experience = ({type, educationList, setEducationList}) =>{

    const [list, setList] = useState([...educationList]);

    const addNewItem = (newItem) => {

        let newList = [...list].concat([newItem]);
        setList(newList);
        console.log("EDUCATION SECTION LIST:");
        console.log([...list]);
        setEducationList([...newList]);
    }

    const setItem = (newItem, index) =>{

        if(newItem !== null){
            list[index] = newItem;

            setList([...list]);
            console.log(list);
        }
        else{
            list.splice(index,1);
            let newList = [...list];
            setList(newList);
        }
        console.log("EDUCATION SECTION LIST:");
        console.log([...list]);
        setEducationList(list);
    }

    useEffect( () => {
        setList([...educationList]);
    }, [educationList])

    return (
        <Container className="d-flex">
            <div className="align-text-right d-inline w-15 py-2 ">
                <span className="d-block">{type}:</span>
            </div>
            <Container className="m-0 p-0 d-block">
            {list.map((item, index) => {
                return (
                    <OneExpModal itemParam={item} index={index} setItem={setItem}/>
                );
            })}
            <AddExpModal addNewItem={addNewItem}/>
            </Container>
        </Container>
    );
}

export default Experience