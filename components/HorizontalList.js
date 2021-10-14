import { Flex, HStack, Image, Box } from "@chakra-ui/react";
import BrandedHeading from "./BrandedHeading";

const HorizontalList = ({
  title,
  movieList,
  setDescriptionDetails,
  descriptionShowing,
  setDescriptionShowing,
  handleClick,
}) => {
  // const handleClick = (item) => {
  //   setDescriptionDetails(item);

  //   if (!descriptionShowing) {
  //     setDescriptionShowing(true);
  //   }
  // };

  return (
    <Flex direction="column" p="0.4rem 0.4rem 0 0.4rem">
      <BrandedHeading
        props={{
          fontSize: "2rem",
          mb: "0rem",
        }}
      >
        {title}
      </BrandedHeading>

      {movieList.length > 0 ? (
        <HStack
          overflowX="scroll"
          className="hideScrollbar"
          p="0.4rem 0.4rem 1.5rem 0.4rem"
          m="0"
          spacing={3}
        >
          {movieList.map((item, index) => {
            const {
              adult,
              backdrop_path,
              genre_ids,
              id,
              original_language,
              original_title,
              overview,
              popularity,
              poster_path,
              release_date,
              title,
              video,
              vote_average,
              vote_count,
            } = item;

            return (
              <Box key={index}>
                <Image
                  onClick={() => handleClick(item)}
                  cursor="pointer"
                  transition="0.3s ease-in-out"
                  _hover={{ transform: "scale(1.05)" }}
                  boxShadow="7px 7px 10px 1px rgb(0, 0, 0, 0.2)"
                  w={40}
                  minW={40}
                  minH="240px"
                  alt={`${title} Poster`}
                  src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                />
              </Box>
            );
          })}
        </HStack>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default HorizontalList;
