import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column-reverse', sm: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      padding="40px"
    >
      <Box flex="1">
      <Container>
        <Typography variant="h5" gutterBottom>
          Welcome, Repair Shop Workers!
        </Typography>
        <Typography variant="body1" paragraph>
          Our Repair Shop Management System is your ultimate tool for optimizing repair processes and ensuring efficient workflows. This application is tailored to simplify and enhance your daily tasks, empowering you to deliver top-quality repair services seamlessly.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Key Features:
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          <ul>
            <li>
              <Typography variant="body1">
                Repair Ticket Management: Create, track, and manage repair tickets efficiently. Assign tasks to technicians, update ticket statuses, and ensure smooth progress throughout the repair process.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Inventory Control: Keep track of parts, accessories, vehicles effortlessly.
              </Typography>
            </li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          How to Use:
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          <ul>
            <li>
              <Typography variant="body1">
                Login: Use your unique credentials to access the system.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Dashboard Overview: Get an overview of ongoing repairs, available vehicles and available tools.
              </Typography>
            </li>
          </ul>
        </Typography>

        <Typography variant="body1">
          Our goal is to streamline your work processes and enhance your efficiency in delivering exceptional repair services. Embrace the power of our Repair Shop Management System and witness a simplified, organized, and more productive workflow!
        </Typography>
      </Container>
    </Box>

      <Box flex="1" textAlign="center" marginTop={{ xs: 15, sm: 10 }}>
        <img
          src="/bole.png"
          alt="Placeholder"
          style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
        />
      </Box>
    </Box>
  )
}

export default Home
