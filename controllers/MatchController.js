'use strict';

import { TimeRenderer } from '../views/TimeRenderer';

const timeRenderer = new TimeRenderer('time-section');
timeRenderer.render(new Date().toLocaleTimeString());
