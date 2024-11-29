/* eslint-disable no-unused-vars */
import React from 'react'

const useAuth = () => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return false
        } else {
            return true
        }
    }
    return { isAuthenticated }
}

export default useAuth
