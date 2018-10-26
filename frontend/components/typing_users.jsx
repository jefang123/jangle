import React from 'react';

class TypingUsers extends React.PureComponent {

  render () {
    let typingUsers= Object.values(typing).filter(id => {id === currentUser.id})
    typingUsers = typingUsers.map(id => {return this.props.users[id]})

    let typingLine =  <p></p>;

    if (typingUsers.length > 2) {
      typingLine = <p>{typingUsers[0].username} and {typingUsers.length-1} others are typing</p>
    } 
    else if (typingUsers.length === 2) {
      typingLine = <p>{typingUsers[0].username} and {typingUsers[1].username} are typing</p>
    } 
    else if (typingUsers.length === 1) {
      typingLine = <p>{typingUsers[0].username} is typing</p>
    }

    return (
      {typingLine}
    );
  }
}

export default TypingUsers;
