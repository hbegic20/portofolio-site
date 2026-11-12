const routes = ["GET /api/v1/me", "POST /api/v1/contact"];

function notFound(request: Request) {
  const { pathname } = new URL(request.url);
  return Response.json(
    { ok: false, error: `no route for ${request.method} ${pathname}`, routes },
    { status: 404 },
  );
}

export {
  notFound as GET,
  notFound as POST,
  notFound as PUT,
  notFound as PATCH,
  notFound as DELETE,
};
