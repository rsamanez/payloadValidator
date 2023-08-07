const { payloadValidator } = require('../payloadValidator');

function functionResultError(a, b) {
  const result = payloadValidator(a, b);
  console.log('RESULT-ERROR:', result.error)
  return result.error
}
function functionResultMessages(a, b) {
  const result = payloadValidator(a, b);
  console.log('RESULT-MESSAGES', result.messages);
  return result.messages
}

describe("payloadValidator", () => {
  test("returns Errors", () => {
    const payload = {
      name: 34,
      ap: 'salas',
      location: {
        address: 'calle1',
        lat: 34.345356,
        lng: -86.2342,
        locxcwd: 45
      },
      edad: 23.78,
      dep: [
        {
          ab: 'cada',
          bb: 3443.45,
          c: {
            n1: 'xxx',
            n2: 3,
            xx: ['efge']
          }
        },
        {
          a: 'cada',
          b: 3443.45,
          c: {
            n1: 'xxx',
            n2: 3
          }
        }
      ],
      noValid: 'string',
      noObj: {
        c: 3,
        b: 'zdfsd'
      },
      noArray: [
        {
          ss: 'dsfsd',
          c: 4
        },
        {
          ss: '545',
          c: 5
        }
      ]
    }
    const validFields = [
      {
        type: 'string',
        name: 'name',
        required: true
      },
      {
        type: 'string',
        name: 'ap',
        required: true
      },
      {
        type: 'object',
        name: 'location',
        required: false,
        properties: [
          {
            type: 'string',
            name: 'address',
            required: true
          },
          {
            type: 'number',
            name: 'lat',
            required: true
          },
          {
            type: 'number',
            name: 'lng',
            required: true
          },
        ]
      },
      {
        type: 'array',
        name: 'dep',
        required: true,
        properties: [
          {
            type: 'string',
            name: 'a',
            required: true
          },
          {
            type: 'number',
            name: 'b',
            required: true
          },
          {
            type: 'object',
            name: 'c',
            required: true,
            properties: [
              {
                type: 'string',
                name: 'n1',
                required: true
              },
              {
                type: 'number',
                name: 'n2',
                required: true
              }
            ]
          }
        ]
      },
      {
        type: 'number',
        name: 'edad',
        required: true
      },
    ];
    expect(functionResultError(payload, validFields)).toBe(true);
    expect(functionResultMessages(payload, validFields)).toEqual([
      {
        "error": "This property has to be a string",
        "property": "name"
      },
      {
        "error": "This property is not allowed on this Payload",
        "property": "location.locxcwd"
      },
      {
        "error": "This property is not allowed on this Payload",
        "property": "dep[].ab"
      },
      {
        "error": "This property is not allowed on this Payload",
        "property": "dep[].bb"
      },
      {
        "error": "This property is not allowed on this Payload",
        "property": "dep[].c.xx"
      },
      {
        "error": "This is a required property on this Payload",
        "property": "dep[].a"
      },
      {
        "error": "This is a required property on this Payload",
        "property": "dep[].b"
      },
      {
        "error": "This property is not allowed on this Payload",
        "property": "noValid"
      },
      {
        "error": "This property is not allowed on this Payload",
        "property": "noObj"
      },
      {
        "error": "This property is not allowed on this Payload",
        "property": "noArray"
      }
    ]);
  });
  test("returns NO errors", () => {
    const payload = {
      name: 'Juan',
      ap: 'salas',
      location: {
        address: 'calle1',
        lat: 34.345356,
        lng: -86.2342
      },
      edad: 23.78,
      dep: [
        {
          a: 'cada',
          b: 3443.45,
          c: {
            n1: 'xxx',
            n2: 3
          }
        },
        {
          a: 'cada',
          b: 3443.45,
          c: {
            n1: 'xxx',
            n2: 3
          }
        }
      ]
    }
    const validFields = [
      {
        type: 'string',
        name: 'name',
        required: true
      },
      {
        type: 'string',
        name: 'ap',
        required: true
      },
      {
        type: 'object',
        name: 'location',
        required: true,
        properties: [
          {
            type: 'string',
            name: 'address',
            required: true
          },
          {
            type: 'number',
            name: 'lat',
            required: true
          },
          {
            type: 'number',
            name: 'lng',
            required: true
          },
        ]
      },
      {
        type: 'array',
        name: 'dep',
        required: true,
        properties: [
          {
            type: 'string',
            name: 'a',
            required: true
          },
          {
            type: 'number',
            name: 'b',
            required: true
          },
          {
            type: 'object',
            name: 'c',
            required: true,
            properties: [
              {
                type: 'string',
                name: 'n1',
                required: true
              },
              {
                type: 'number',
                name: 'n2',
                required: true
              }
            ]
          }
        ]
      },
      {
        type: 'number',
        name: 'edad',
        required: true
      },
    ];
    expect(functionResultError(payload, validFields)).toBe(false);
    expect(functionResultMessages(payload, validFields)).toEqual([]);
  });
  test("returns errors", () => {
    const payload = {
      name: 'Juan',
      ap: 'salas',
      location: {
        address: 'calle1',
        lat: 34.345356,
        lng: -86.2342
      },
      edad: 23.78,
      dep: [
        {
          a: 'cada',
          b: 3443.45,
          c: {
            n1: 'xxx',
            n2: 3
          }
        },
        {
          a: 'cada',
          b: 3443.45,
          c: {
            n1: 'xxx',
            n2: 3,
            extraItem: 'Invalid'
          }
        }
      ]
    }
    const validFields = [
      {
        type: 'string',
        name: 'name',
        required: true
      },
      {
        type: 'string',
        name: 'ap',
        required: true
      },
      {
        type: 'object',
        name: 'location',
        required: true,
        properties: [
          {
            type: 'string',
            name: 'address',
            required: true
          },
          {
            type: 'number',
            name: 'lat',
            required: true
          },
          {
            type: 'number',
            name: 'lng',
            required: true
          },
        ]
      },
      {
        type: 'array',
        name: 'dep',
        required: true,
        properties: [
          {
            type: 'string',
            name: 'a',
            required: true
          },
          {
            type: 'number',
            name: 'b',
            required: true
          },
          {
            type: 'object',
            name: 'c',
            required: true,
            properties: [
              {
                type: 'string',
                name: 'n1',
                required: true
              },
              {
                type: 'number',
                name: 'n2',
                required: true
              }
            ]
          }
        ]
      },
      {
        type: 'number',
        name: 'edad',
        required: true
      },
    ];
    expect(functionResultError(payload, validFields)).toBe(true);
    expect(functionResultMessages(payload, validFields)).toEqual([{
      property: 'dep[].c.extraItem',
      error: 'This property is not allowed on this Payload'
    }]);
  });
  test("returns NO errors", () => {
    const payload = {}
    const validFields = [];
    expect(functionResultError(payload, validFields)).toBe(false);
    expect(functionResultMessages(payload, validFields)).toEqual([]);
  });
  test("returns NO errors", () => {
    const payload = {
      name: [
        {
          first: {
            a: 10,
            b: 'string'
          },
          second: {
            notrequired: 'abc',
            notreq: 34.45
          }
        },
        {
          first: {
            a: 10
          }
        }
      ]
    }
    const validFields = [
      {
        type: 'array',
        name: 'name',
        required: true,
        properties: [
          {
            type:'object',
            name: 'first',
            required: true,
            properties:[
              {
                type:'number',
                name: 'a',
                required: true
              },
              {
                type:'string',
                name: 'b',
                required: false
              }
            ]
          },
          {
            type:'object',
            name: 'second',
            required: false,
            properties:[
              {
                type:'string',
                name: 'notrequired',
                required: true
              },
              {
                type:'number',
                name: 'notreq',
                required: true
              }
            ]
          } 
        ]
      }
    ];
    expect(functionResultError(payload, validFields)).toBe(false);
    expect(functionResultMessages(payload, validFields)).toEqual([]);
  });
});