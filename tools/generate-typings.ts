import { join } from 'path';

import { GraphQLDefinitionsFactory } from '@nestjs/graphql';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/app/**/*.graphql'],
  path: join(process.cwd(), 'src/generated/graphql.ts'),
  outputAs: 'class',
  watch: true,
});
