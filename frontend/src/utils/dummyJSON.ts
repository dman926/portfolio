import { prependString } from "./strings";

interface FilterOptions {
  limit?: number;
  skip?: number;
}

interface FilterExtendedOptions {
  select: string | string[];
}

interface RouteProperties<
  Options extends object | string,
  RType extends object
> {
  options: Options;
  ReturnType: RType;
}

interface Deletion {
  isDeleted: true;
  deletedOn: Date;
}

type ManyResponse<K extends string, V> = {
  [key in K]: V[];
} & {
  total: number;
  skip: number;
  limit: number;
};

type TokenResponse = Pick<
  DummyUser,
  "id" | "username" | "email" | "firstName" | "lastName" | "gender" | "image"
> & { token: string };

interface DummyAuthOptions {
  login: RouteProperties<
    {
      username: string;
      password: string;
      /**
       * @default 60
       */
      expiresInMins?: number;
    },
    TokenResponse
  >;
  getUser: RouteProperties<
    {
      token: string;
    },
    DummyUser
  >;
  refresh: RouteProperties<
    {
      token: string;
      /**
       * @default 60
       */
      expiresInMins?: number;
    },
    TokenResponse
  >;
}

interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface DummyProductOptions {
  getAll: RouteProperties<
    FilterOptions & FilterExtendedOptions,
    ManyResponse<"products", DummyProduct>
  >;
  getSingle: RouteProperties<
    { id: number } & FilterOptions & FilterExtendedOptions,
    DummyProduct
  >;
  getCategories: RouteProperties<{}, string[]>;
  byCategory: RouteProperties<
    FilterOptions & FilterExtendedOptions,
    ManyResponse<"products", DummyProduct>
  >;
  search: RouteProperties<string, ManyResponse<"products", DummyProduct>>;
  create: RouteProperties<
    Partial<Omit<DummyProduct, "id">> & Pick<DummyProduct, "title">,
    DummyProduct
  >;
  update: RouteProperties<
    Partial<DummyProduct> & Pick<DummyProduct, "id">,
    DummyProduct
  >;
  delete: RouteProperties<Pick<DummyProduct, "id">, DummyProduct & Deletion>;
}

interface DummyCart {
  id: number;
  products: (Pick<
    DummyProduct,
    "id" | "title" | "price" | "discountPercentage" | "thumbnail"
  > & {
    quantity: number;
    total: number;
    discountedPrice: number;
  })[];
  total: 2328;
  discountedTotal: 1941;
  userId: 97;
  totalProducts: 5;
  totalQuantity: 10;
}

interface DumymCartOptions {
  getAll: RouteProperties<FilterOptions, ManyResponse<"carts", DummyCart>>;
  getSingle: RouteProperties<{ id: number }, DummyCart>;
  getUserCarts: RouteProperties<
    { userId: number } & FilterOptions,
    ManyResponse<"carts", DummyCart>
  >;
  create: RouteProperties<
    {
      userId: DummyCart["userId"];
      products: {
        id: DummyCart["products"][number]["id"];
        quantity: DummyCart["products"][number]["quantity"];
      }[];
    },
    DummyCart
  >;
  update: RouteProperties<
    Pick<DummyCart, "userId"> & {
      merge: boolean;
      products: Pick<DummyCart["products"][number], "id" | "quantity">[];
    },
    DummyCart
  >;
  delete: RouteProperties<Pick<DummyCart, "id">, DummyCart & Deletion>;
}

interface DummyRecipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface DummyRecipeOptions {
  getAll: RouteProperties<
    FilterOptions & FilterExtendedOptions,
    ManyResponse<"recipes", DummyRecipe>
  >;
  getSingle: RouteProperties<
    FilterOptions & FilterExtendedOptions,
    DummyRecipe
  >;
  getTags: RouteProperties<{}, string[]>;
  byTag: RouteProperties<
    { tag: string } & FilterOptions & FilterExtendedOptions,
    ManyResponse<"recipes", DummyRecipe>
  >;
  byMealType: RouteProperties<
    { mealType: string } & FilterOptions & FilterExtendedOptions,
    ManyResponse<"recipes", DummyRecipe>
  >;
  search: RouteProperties<string, ManyResponse<"recipes", DummyRecipe>>;
}

interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
}

interface DummyUserOptions {
  getAll: RouteProperties<
    FilterOptions & FilterExtendedOptions,
    ManyResponse<"users", DummyUser>
  >;
  getSingle: RouteProperties<
    { id: number } & FilterOptions & FilterExtendedOptions,
    DummyUser
  >;
  getAuthUser: RouteProperties<
    { token: string } & FilterOptions & FilterExtendedOptions,
    ManyResponse<"users", DummyUser>
  >;
  getUserCarts: RouteProperties<
    { userId: number } & FilterOptions & FilterExtendedOptions,
    ManyResponse<"users", DummyUser>
  >;
  getUserPosts: RouteProperties<
    { userId: number } & FilterOptions & FilterExtendedOptions,
    ManyResponse<"users", DummyUser>
  >;
  getUserTodos: RouteProperties<
    { userId: number } & FilterOptions & FilterExtendedOptions,
    ManyResponse<"users", DummyUser>
  >;
  filter: RouteProperties<
    { key: string; value: string } & FilterOptions & FilterExtendedOptions,
    ManyResponse<"users", DummyUser>
  >;
  search: RouteProperties<string, ManyResponse<"users", DummyUser>>;
  create: RouteProperties<
    Partial<Omit<DummyUser, "id">> &
      Pick<DummyUser, "firstName" | "lastName" | "age">,
    DummyUser
  >;
  update: RouteProperties<
    Partial<DummyUser> & Pick<DummyUser, "id">,
    DummyUser
  >;
  delete: RouteProperties<Pick<DummyUser, "id">, DummyUser & Deletion>;
}

interface DummyPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

interface DummyPostOptions {
  getAll: RouteProperties<
    FilterOptions & FilterExtendedOptions,
    ManyResponse<"posts", DummyPost>
  >;
  getSingle: RouteProperties<
    { id: number } & FilterOptions & FilterExtendedOptions,
    DummyPost
  >;
  getByUserId: RouteProperties<
    { userId: number } & FilterOptions & FilterExtendedOptions,
    ManyResponse<"posts", DummyPost>
  >;
  getComments: RouteProperties<
    { postId: number } & FilterOptions & FilterExtendedOptions,
    ManyResponse<"posts", DummyPost>
  >;
  search: RouteProperties<string, {}>;
  create: RouteProperties<
    Partial<Omit<DummyPost, "id">> & Pick<DummyPost, "title" | "userId">,
    DummyPost
  >;
  update: RouteProperties<
    Partial<DummyPost> & Pick<DummyPost, "id">,
    DummyPost
  >;
  delete: RouteProperties<Pick<DummyPost, "id">, DummyPost & Deletion>;
}

interface DummyComment {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
}

interface DummyCommentOptions {
  getAll: RouteProperties<
    FilterOptions & FilterExtendedOptions,
    ManyResponse<"comments", DummyComment>
  >;
  getSingle: RouteProperties<
    { id: number } & FilterOptions & FilterExtendedOptions,
    DummyComment
  >;
  getByPostId: RouteProperties<
    { postId: number } & FilterOptions & FilterExtendedOptions,
    ManyResponse<"comments", DummyComment>
  >;
  create: RouteProperties<
    Partial<Omit<DummyComment, "id">> &
      Pick<DummyComment, "body" | "postId"> & {
        userId: DummyComment["user"]["id"];
      },
    DummyComment
  >;
  update: RouteProperties<
    Partial<DummyComment> & Pick<DummyComment, "id">,
    DummyComment
  >;
  delete: RouteProperties<Pick<DummyComment, "id">, DummyComment & Deletion>;
}

interface DummyTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface DummyTodoOptions {
  getAll: RouteProperties<FilterOptions, ManyResponse<"todos", DummyTodo>>;
  getSingle: RouteProperties<{ id: number } & FilterOptions, DummyTodo>;
  getRandom: RouteProperties<FilterOptions, ManyResponse<"todos", DummyTodo>>;
  create: RouteProperties<Omit<DummyTodo, "id">, DummyTodo>;
  update: RouteProperties<
    Partial<DummyTodo> & Pick<DummyTodo, "id">,
    DummyTodo
  >;
  delete: RouteProperties<Pick<DummyTodo, "id">, DummyTodo & Deletion>;
}

interface DummyQuote {
  id: number;
  quote: string;
  author: string;
}

interface DummyQuoteOptions {
  getAll: RouteProperties<FilterOptions, ManyResponse<"quotes", DummyQuote>>;
  getSingle: RouteProperties<{ id: number } & FilterOptions, DummyQuote>;
  getRandom: RouteProperties<FilterOptions, DummyQuote>;
}

interface DummyMock {
  status: number;
  message: string;
}

interface DummyMockOptions {
  http: RouteProperties<
    Omit<DummyMock, "message"> & Partial<Pick<DummyMock, "message">>,
    DummyMock
  >;
}

interface DummyTypeMap {
  auth: DummyAuthOptions;
  products: DummyProductOptions;
  carts: DumymCartOptions;
  recipes: DummyRecipeOptions;
  users: DummyUserOptions;
  posts: DummyPostOptions;
  comments: DummyCommentOptions;
  todos: DummyTodoOptions;
  quotes: DummyQuoteOptions;
  mock: DummyMockOptions;
}

type Endpoints = {
  [DT in keyof DummyTypeMap]: Record<keyof DummyTypeMap[DT], string>;
};

const endpoints: Endpoints = prependString("https://dummyjson.com/", {
  auth: prependString("auth/", {
    login: "login",
    getUser: "me",
    refresh: "refresh",
  }),
  products: prependString("products", {
    getAll: "",
    getSingle: "/:productId",
    search: "/search",
    getCategories: "/categories",
    byCategory: "/category/:category",
    create: "/add",
    update: "/:productId",
    delete: "/:productId",
  }),
  carts: prependString("carts", {
    getAll: "",
    getSingle: "/:cartId",
    getUserCarts: "/users/:userId",
    create: "/add",
    update: "/:cartId",
    delete: "/:cartId",
  }),
  recipes: prependString("recipes", {
    getAll: "",
    getSingle: "/:recipeId",
    search: "/search",
    getTags: "/tags",
    byTag: "/tag/:tag",
    byMealType: "/meal-type/:mealType",
  }),
  users: {
    getAuthUser: "user/me",
    ...prependString("users", {
      getAll: "",
      getSingle: "/:userId",
      search: "/search",
      filter: "/filter",
      getUserCarts: "/:userId/carts",
      getUserPosts: "/:userId/posts",
      getUserTodos: "/:userId/todos",
      create: "/add",
      update: "/:userId",
      delete: "/:userId",
    }),
  },
  posts: prependString("posts", {
    getAll: "",
    getSingle: "/:postId",
    search: "/search",
    getByUserId: "/user/:userId",
    getComments: "/:postId/comments",
    create: "add",
    update: "/:postId",
    delete: "/:postId",
  }),
  comments: prependString("comments", {
    getAll: "",
    getSingle: "/:commentId",
    getByPostId: "/post/:postId",
    create: "/add",
    update: "/:commentId",
    delete: "/:commentId",
  }),
  todos: prependString("todos", {
    getAll: "",
    getSingle: "/:todoId",
    getRandom: "/random",
    create: "/add",
    update: "/:todoId",
    delete: "/:todoId",
  }),
  quotes: prependString("quotes", {
    getAll: "",
    getSingle: "/:quoteId",
    getRandom: "/random",
  }),
  mock: {
    http: "http/:status/:message?",
  },
});

export const dummyJSON = async <
  Item extends keyof DummyTypeMap,
  Method extends keyof DummyTypeMap[Item],
  Options extends DummyTypeMap[Item][Method] extends RouteProperties<
    infer O,
    infer R
  >
    ? O
    : never,
  RType extends DummyTypeMap[Item][Method] extends RouteProperties<
    infer O,
    infer R
  >
    ? R
    : never
>(
  item: Item,
  endpoint: Method,
  options?: Options
): Promise<RType> => {
  let url = endpoints[item][endpoint];

  let method = "GET";
  if (endpoint === "update") {
    method = "PUT";
  } else if (endpoint === "delete") {
    method = "DELETE";
  }

  let headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (options) {
    /**
     * TODO:
     * Collect path params (prefixed with : and suboptionality suffexed with ?) and replace them with the ones in options
     * All other options are query options
     */
  }

  const response = await fetch(url, {
    method,
    headers,
  });
  const data = await response.json();
  return data as RType;
};

export default dummyJSON;
