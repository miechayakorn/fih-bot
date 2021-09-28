import { google } from 'googleapis'

// Provide the required configuration
export const CREDENTIALS = process.env.CREDENTIALS
export const calendarId = process.env.CALENDAR_ID

// Google calendar API settings
export const SCOPES = 'https://www.googleapis.com/auth/calendar'
export const calendar = google.calendar({version: 'v3'})

export const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
)
