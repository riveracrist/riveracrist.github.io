import test from 'node:test';
import assert from 'node:assert/strict';
import { phases, stories } from '../src/data/phases.js';

test('define las ocho fases educativas del ciclo', () => {
  assert.equal(phases.length, 8);
  for (const phase of phases) assert.ok(phase.id && phase.goal && phase.role && phase.tasks.length && phase.deliverables.length && phase.example);
});

test('incluye historias con criterios de aceptación', () => {
  assert.equal(stories.length, 4);
  assert.ok(stories.every(story => story.criteria.length >= 2));
  assert.match(stories.map(story => story.text).join(' '), /eliminar/);
});
