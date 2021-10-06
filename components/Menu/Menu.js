// import {
//   Menu,
//   MenuItem,
//   MenuList,
//   MenuButton,
//   MenuDivider,
//   Text,
//   Flex,
// } from "@chakra-ui/react";
// import { generateKey } from "../../utils/helperFunctions";

// const MenuComponent = ({ menuName, menuIcon, menuItems }) => {
//   const menuItemArray = menuItems.map((item, index) => {
//     return (
//       <MenuItem key={generateKey()} onClick={item.onclick}>
//         {item.icon}
//         <Text ml="10px">{item.text}</Text>
//       </MenuItem>
//     );
//   });

//   return (
//     <Menu>
//       {({ isOpen }) => (
//         <>
//           <MenuButton
//             userSelect="none"
//             as={Flex}
//             cursor="pointer"
//             flexDirection="row"
//           >
//             <Text color="brand.text.dark" fontSize="1rem">
//               {menuName}
//               {isOpen ? menuIcon[1] : menuIcon[0]}
//             </Text>
//           </MenuButton>
//           <MenuList>{menuItemArray}</MenuList>
//         </>
//       )}
//     </Menu>
//   );
// };

// export default MenuComponent;
