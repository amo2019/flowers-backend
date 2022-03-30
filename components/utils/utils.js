export const handleCart = async (api, method, body) => {
  try {
    const req = await fetch(`/api/${api}`, {
      method,
      body: JSON.stringify(body)
    });

    return await req.json();
  } catch (err) {
    console.log(err);
  }
};