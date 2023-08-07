function payloadValidation(payload,validProperties){
  let error = false;
  let messages = [];
  Object.keys(payload).forEach( e =>{
    const property = validProperties.find( i => i.name === e);
    if(property){
      // console.log('type of',e ,'==> ', typeof(payload[e]))
      if(property.type === 'array'){
        if(!Array.isArray(payload[e])){
          messages.push({
            property: e,
            error: 'This property has to be an Array'
          })
          error = true;
        }else{
          payload[e].forEach(subItem =>{
            const result = payloadValidation(subItem,property.properties);
            if(result.error){
              error=true;
              result.messages.forEach(m =>{
                messages.push({
                  property: `${e}[].${m.property}`,
                  error: m.error
                })
              })
            }
          })
        }
      }else{
        if(typeof(payload[e]) !== property.type){
          messages.push({
            property: e,
            error: `This property has to be a${property.type === 'object'? 'n' : ''} ${property.type}`
          })
          error = true;
        }else{
          if(property.type === 'object'){
            const result = payloadValidation(payload[e],property.properties);
            if(result.error){
              error=true;
              result.messages.forEach(m =>{
                messages.push({
                  property: `${e}.${m.property}`,
                  error: m.error
                })
              })
            }
          }
        }
      }
    }else{
      // console.log('Property:',e,' not found.')
      messages.push({
        property: e,
        error: 'This property is not allowed on this Payload'
      })
      error = true;
    }
  });
  // validating Required Attributes
  validProperties.forEach( prop =>{
    // console.log('validProperties[',prop.name,']')
    if(prop.required){
      if(!payload.hasOwnProperty(prop.name))
      {
        messages.push({
          property: prop.name,
          error: 'This is a required property on this Payload'
        })
        error = true;
      }
    }
  });
  return {
    error,
    messages
  }
}
function payloadValidator(payload,validProperties){
  return payloadValidation(payload,validProperties)
}

module.exports = {
  payloadValidator
}