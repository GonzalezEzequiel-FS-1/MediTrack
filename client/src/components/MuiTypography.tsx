import { Typography } from "@mui/material";
const MuiTypography = () => {
  return (
    <div>
      <Typography variant="h1">H1 Heading</Typography>
      <Typography variant="h2">H2 Heading</Typography>
      <Typography variant="h3">H3 Heading</Typography>
      <Typography variant="h4">H4 Heading</Typography>
      <Typography variant="h5" component="h1" gutterBottom>
        H5 Heading
      </Typography>
      <Typography variant="h6">H6 Heading</Typography>
      <Typography variant="subtitle1">Subtitle 1</Typography>
      <Typography variant="subtitle2">Subtitle 2</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus vel,
        consequatur culpa corporis ipsa facilis, laborum, nisi deserunt nihil
        eveniet molestiae. Molestiae possimus distinctio numquam officia
        recusandae debitis a quia?
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        repudiandae eveniet id facere quae laboriosam voluptate dignissimos
        harum numquam tempore animi autem blanditiis quia hic quibusdam
        voluptatem, cupiditate vitae ad?
      </Typography>
    </div>
  );
};

export default MuiTypography;
