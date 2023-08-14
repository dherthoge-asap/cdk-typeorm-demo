#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkTypeormDemoStack } from '../lib/cdk-typeorm-demo-stack';

const app = new cdk.App();
new CdkTypeormDemoStack(app, 'CdkTypeormDemoStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});