export async function upload(file: File) {
  try {
    const data = new FormData();
    data.set('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: data,
    });

    if (res.ok) {
      return res.json();
    } else {
      throw new Error(await res.text());
    }
  } catch (e: any) {
    console.error(e);
  }
}
