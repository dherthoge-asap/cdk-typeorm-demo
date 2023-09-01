#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DemoSharedResourcesStack } from '../lib/cdk-typeorm-demo-stack';
import { getSharedResourcesContext } from '../utils/context/context';

const app = new cdk.App();
new DemoSharedResourcesStack(app, 'CdkTypeormDemoStack', getSharedResourcesContext(), {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});