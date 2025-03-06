'use client'

import React, { useEffect, useState } from 'react';

type UserClientProps = {
  type: string;
  id: number;
}

const UserClientModal: React.FC<UserClientProps> = ({type, id}) => {
  useEffect(() => {
    // if(type === "user") {
    //   const userData = await getUserDataById(id);
    //   setUserData(usrData);
    //
    // }
    // else getClientDataById(id);
  }, []);
  return (
    <></>
  );
}

export default UserClientModal;