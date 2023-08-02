module.exports = {
   // the helper method 'format_time' will take in a timestamp and return a string with only the time
  format_time: (date) => {//this fxn has the date and itll return the local time stream based on the date we passed  
    // Format date as MM/DD/YYYY
    return date.toLocaleTimeString(); // We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM
  },

//Format date,month, then year 
format_date: date => { //A custom helper 'format_date' that takes in a timestamp
  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${   // Using JavaScript Date methods, we get and format the month, date, and year
    // We need to add one to the month since it is returned as a zero-based value
    new Date(date).getFullYear() + 5 // We add five years to the 'year' value to calculate the end date
  }`;
},
};

