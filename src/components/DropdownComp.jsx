import React from 'react'
import { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export const DropdownComp = ({categories, selCateg, setSelCateg}) => {
  console.log(categories);
    const [dropdownOpen, setDropDownOpen] = useState(false)
    const toggle = () => setDropDownOpen((prevState) => !prevState)
    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
         {selCateg ? selCateg : 'Kategóriák'}
        </DropdownToggle>
        <DropdownMenu>
          {categories ? categories.map(obj=>
            <DropdownItem key={obj.id}
            onClick={()=>setSelCateg(obj.name)}
            >{obj.name}</DropdownItem>
          )
        :
        <DropdownItem disabled>Nincs elérhető kategória</DropdownItem>
        }
          
        </DropdownMenu>
      </Dropdown>
    )
}


