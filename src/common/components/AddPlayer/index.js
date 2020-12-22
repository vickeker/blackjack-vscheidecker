import React, { useEffect, useState } from 'react'
import 'App.css';
import { getPlayer } from 'common/players';

export function AddPlayer (props) {
    const {handleNewPlayer} = props
    const [name, setName] = useState('');
    const [formData, updateFormData] = useState({});

    useEffect( async () => {
        // save/get player from name
        if (name != undefined && name != '') {
            var player = await getPlayer(name);
            // return player to main components
            handleNewPlayer(player)
        }
    }, [name]);

    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim()
        });
      };

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        setName(formData.name)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    Player name
                    <input name="name" type="text" onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );

}