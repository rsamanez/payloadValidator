# payloadValidator
Sample to validate a Payload Structure, no librearies required.
### validator sample use

```
const { payloadValidator } = require('./payloadValidator');

validationStructure = [
{
    type: 'string',
    name: 'name',
    required: true
  },
  {
    type:'number',
    name: 'ap',
    required: true
  },
  {
    type:'object',
    name: 'location',
    required: false,
    properties:[
      {
        type:'string',
        name: 'address',
        required: true
      },
      {
        type:'number',
        name: 'lat',
        required: true
      },
      {
        type:'number',
        name: 'lng',
        required: true
      },
    ]
  },
  {
    type:'array',
    name: 'dep',
    required: true,
    properties:[
      {
        type:'string',
        name: 'a',
        required: true
      },
      {
        type:'number',
        name: 'b',
        required: false
      },
      {
        type:'object',
        name: 'c',
        required: true,
        properties:[
          {
            type:'string',
            name: 'n1',
            required: false
          },
          {
            type:'number',
            name: 'n2',
            required: true
          }
        ]
      }
    ]
  },
  {
    type:'number',
    name: 'edad',
    required: false
  }
];

const payload = {
  name: 34,
  ap: 'salas',
  location: {
    address: 'calle1',
    lat: 34.345356,
    lng:-86.2342,
    locxcwd: 45
  },
  edad: 23.78,
  dep:[
    {
      ab:'cada',
      bb: 3443.45,
      c: {
        n1:'xxx',
        n2:3,
        xx: ['efge']
      }
    },
    {
      a:'cada',
      b: 3443.45,
      c: {
        n1:'xxx',
        n2:3
      }
    }
  ],
  noValid:'string',
  noObj:{
    c:3,
    b:'zdfsd'
  },
  noArray:[
    {
      ss:'dsfsd',
      c:4
    },
    {
      ss:'545',
      c:5
    }
  ]
}

const { error, messages } = payloadValidator(payload, validSchema);

console.log('ERROR:',error)
console.log('Messages:',messages)
```
