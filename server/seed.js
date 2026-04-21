const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

const PROFILES = [
  { name:'Anika Rahman',    email:'anika@demo.com',    password:'demo1234', age:23, gender:'Female', religion:'Islam',       location:'Dhaka',      maritalStatus:'Never Married', education:"Bachelor's", university:'BUET',         profession:'Software Engineer', bio:'I love reading Tagore and cooking on weekends. Looking for someone kind and intellectually curious.', photo:'https://randomuser.me/api/portraits/women/11.jpg' },
  { name:'Fatima Islam',    email:'fatima@demo.com',   password:'demo1234', age:25, gender:'Female', religion:'Islam',       location:'Chittagong', maritalStatus:'Never Married', education:"Master's",   university:'University of Chittagong', profession:'Doctor', bio:'Passionate about medicine and travel. I enjoy hiking and cooking Bangladeshi cuisine.', photo:'https://randomuser.me/api/portraits/women/32.jpg' },
  { name:'Tahsin Rahman',   email:'tahsin@demo.com',   password:'demo1234', age:28, gender:'Male',   religion:'Islam',       location:'Dhaka',      maritalStatus:'Never Married', education:"Bachelor's", university:'NSU',          profession:'Civil Engineer',     bio:'Avid cricket fan. I work hard and value family above all. Looking for a life partner with good values.', photo:'https://randomuser.me/api/portraits/men/15.jpg' },
  { name:'Mahir Islam',     email:'mahir@demo.com',    password:'demo1234', age:31, gender:'Male',   religion:'Islam',       location:'Sylhet',     maritalStatus:'Never Married', education:"MBA",        university:'IBA DU',       profession:'Business Analyst',   bio:'Finance professional who enjoys cooking and travelling. Seeking a mature and understanding partner.', photo:'https://randomuser.me/api/portraits/men/22.jpg' },
  { name:'Chayon Kibria',   email:'chayon@demo.com',   password:'demo1234', age:26, gender:'Male',   religion:'Islam',       location:'Rajshahi',   maritalStatus:'Never Married', education:"Bachelor's", university:'RU',           profession:'Lecturer',           bio:'Academic at heart. I write poetry and love philosophical discussions. Looking for depth in a relationship.', photo:'https://randomuser.me/api/portraits/men/33.jpg' },
  { name:'Priya Das',       email:'priya@demo.com',    password:'demo1234', age:24, gender:'Female', religion:'Hinduism',    location:'Dhaka',      maritalStatus:'Never Married', education:"Bachelor's", university:'DU',           profession:'Graphic Designer',   bio:'Creative soul who paints and plays tabla. Hoping to find someone who appreciates art and culture.', photo:'https://randomuser.me/api/portraits/women/45.jpg' },
  { name:'Rohan Roy',       email:'rohan@demo.com',    password:'demo1234', age:29, gender:'Male',   religion:'Hinduism',    location:'Khulna',     maritalStatus:'Never Married', education:"Master's",   university:'KU',           profession:'Pharmacist',         bio:'Science enthusiast. I enjoy board games, documentaries, and long conversations over chai.', photo:'https://randomuser.me/api/portraits/men/44.jpg' },
  { name:'Sadia Akter',     email:'sadia@demo.com',    password:'demo1234', age:22, gender:'Female', religion:'Islam',       location:'Mymensingh', maritalStatus:'Never Married', education:"Bachelor's", university:'BAU',          profession:'Student',            bio:'Final year student passionate about agriculture and sustainability. Simple and family-oriented.', photo:'https://randomuser.me/api/portraits/women/55.jpg' },
  { name:'Arif Hossain',    email:'arif@demo.com',     password:'demo1234', age:34, gender:'Male',   religion:'Islam',       location:'Dhaka',      maritalStatus:'Divorced',       education:"Master's",   university:'BRACU',        profession:'Marketing Manager',  bio:'Mature professional seeking a fresh start. I value honesty, communication, and laughter.', photo:'https://randomuser.me/api/portraits/men/61.jpg' },
  { name:'Nadia Chowdhury', email:'nadia@demo.com',    password:'demo1234', age:27, gender:'Female', religion:'Islam',       location:'Dhaka',      maritalStatus:'Never Married', education:"MBBS",       university:'DMCH',         profession:'Medical Officer',    bio:'Doctor by day, baker by night. I love exploring new restaurants and weekend family trips.', photo:'https://randomuser.me/api/portraits/women/68.jpg' },
  { name:'Joy Thomas',      email:'joy@demo.com',      password:'demo1234', age:30, gender:'Male',   religion:'Christianity',location:'Dhaka',      maritalStatus:'Never Married', education:"Bachelor's", university:'NSU',          profession:'IT Consultant',      bio:'Tech guy who loves football and cooking. Faith and family are central to who I am.', photo:'https://randomuser.me/api/portraits/men/77.jpg' },
  { name:'Sumaiya Begum',   email:'sumaiya@demo.com',  password:'demo1234', age:21, gender:'Female', religion:'Islam',       location:'Barisal',    maritalStatus:'Never Married', education:"Bachelor's", university:'BU',           profession:'Student',            bio:'Young and ambitious. I am studying law and want a partner who supports growth and dreams.', photo:'https://randomuser.me/api/portraits/women/79.jpg' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  for (const p of PROFILES) {
    const exists = await User.findOne({ email: p.email });
    if (!exists) {
      // const salt = await bcrypt.genSalt(10);
      // const hashed = await bcrypt.hash(p.password, salt);
      await User.create({ ...p, password: p.password, isActive: true, isVerified: true });
      console.log(`Created: ${p.name}`);
    } else {
      console.log(`Skipped (exists): ${p.name}`);
    }
  }

  console.log('\nSeeding complete! All 12 demo profiles created.');
  console.log('Login with any email above using password: demo1234');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
