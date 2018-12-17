<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<table>
		<th>Name</th>
		<th>Email</th>
		<th>Score</th>
		<tbody>
			@forelse($data as $val)
				<tr>
				<td>{{ $val->name }}</td>
				<td>{{ $val->email }}</td>
				<td>{{ $val->score }}</td>
			</tr>
			@empty
				NO Articles.
			@endforelse
		</tbody>
	</table>
	{{ $data->links() }}
</body>
</html>