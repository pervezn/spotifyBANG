import React from 'react';

const DropDown = ({genres}) => {
    return (
    <form>
        <select>
          {genres.listOfGenresFromAPI.map((genre, key) => {
            <option key={key}>{genre.name}</option>
          })}
        </select>
      </form>
    )
}

export default DropDown;