/* eslint-disable @typescript-eslint/no-unused-vars */
// # SOLID principles
// Easy application maintenance

// S
// Single responsibility principle

class Statistics {
  computeStatistics() {
    // ...
  }
}

class GraphicGenerator {
  generateBarGraph() {
    // ...
  }
}

// O
// Open / Close principle
// Establece que una entidad de software debe quedarse abierta para su extensión, pero cerrada para su modificación. Metodos llenos de casos especiales, repartir las resposabilidades entre las clase llamadora y la llamada

class Triangle {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

class Circle {
  radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }
}

// If in the future exist more shapes, it will be necessary modify function. This makes it open for modification and breaks the open-closed principle.

function calculateAreasOfMultipleShapes(shapes: Array<Triangle | Circle>) {
  return shapes.reduce((calculatedArea, shape) => {
    if (shape instanceof Triangle) {
      return calculatedArea + (shape.width * shape.height) / 2;
    }
    if (shape instanceof Circle) {
      return calculatedArea + shape.radius * Math.PI;
    }
  }, 0);
}

// Fix implementation. Each class will have his method to calculated Area

interface ShapeOC {
  getArea(): number;
}

class TriangleOC implements ShapeOC {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  getArea() {
    return (this.width * this.height) / 2;
  }
}

class CircleOC implements ShapeOC {
  radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }
  getArea() {
    return this.radius * Math.PI;
  }
}

// If a new shape appear, just create new class thar implement interface ShapeOC

function calculateAreasOfMultipleShapesOC(shapes: ShapeOC[]) {
  return shapes.reduce((calculatedArea, shape) => {
    return calculatedArea + shape.getArea();
  }, 0);
}

// L
// Liskov Substitution Principle

// Cada clase que hereda de otra puede usarse como su padre sin necesidad de conocer las diferencias entre ellas.
// El cliente debe usar métodos de la clase padre únicamente.
// La clase hija no debe alterar el comportamiento de los métodos de la clase padre. Arojar una error diferente a las que arroja la calse padre.

class Rectangle {
  constructor(private width: number, private length: number) {}
  setWidth(width: number) {
    this.width = width;
  }
  setLength(length: number) {
    this.length = length;
  }
  getArea() {
    return this.width * this.length;
  }
}

class Square extends Rectangle {
  constructor(side: number) {
    super(side, side);
  }

  setWidth(width: number) {
    super.setWidth(width);
    super.setLength(width);
  }

  setLength(length: number) {
    super.setWidth(length);
    super.setLength(length);
  }
}

const rect: Rectangle = new Square(10);

// Verificar si la relación que existe realmente es de Herencia

// I
// Interface segregation principle - Pricipio de Segregación de Interfaces
// Los clientes de un programa sólo deberían conocer de éste los métodos que realmente usan.
interface Bird {
  fly(): void;
  walk(): void;
}

class Nightingale implements Bird {
  fly() {
    /// ...
  }
  walk() {
    /// ...
  }
}

class Kiwi implements Bird {
  fly() {
    throw new Error('Unfortunately, Kiwi can not fly!');
  }
  walk() {
    /// ...
  }
}

// The interface segregation principle states that no client should be forced to depend on methods it does not use. By putting too many properties in our interfaces, we risk breaking the above rule.
// Mantener interfaces finas y usar en composición cuando sea necesario
interface CanFly {
  fly(): void;
}

interface CanWalk {
  walk(): void;
}

class NightingaleISP implements CanFly, CanWalk {
  public fly() {
    /// ...
  }
  public walk() {
    /// ...
  }
}

class KiwiISP implements CanWalk {
  public walk() {
    /// ...
  }
}

// D
// Dependency inversion principle
// Los módulos de alto nivel no deben depender de los de bajo nivel (de las implementaciones), ambos deben depender de abstracciones.
// Las abstracciones no deben depender de los detalles, los detalles deben depender de las abstracciones.
// Alto nivel debe tener la lógica de negocio. Bajo nivel implementación de funcionalidades

interface Person {
  introduceSelf(): void;
}
class Engineer implements Person {
  public introduceSelf() {
    console.log('I am an engineer');
  }
}

class Musician implements Person {
  public introduceSelf() {
    console.log('I am a musician');
  }
}

interface IntroductionService {
  introduce(): void;
}

class EngineerIntroductionService implements IntroductionService {
  public introduce() {
    console.log('I am an engineer');
  }
}

class MusicianIntroductionService implements IntroductionService {
  public introduce() {
    console.log('I am an engineer');
  }
}

class Engineer_ implements Person {
  private introductionService = new EngineerIntroductionService();
  public introduceSelf() {
    this.introductionService.introduce();
  }
}

class EngineerDIP implements Person {
  public introductionService: EngineerIntroductionService;

  constructor(introductionService: IntroductionService) {
    this.introductionService = introductionService;
  }

  public introduceSelf() {
    this.introductionService.introduce();
  }
}

const engineerDIP = new EngineerDIP(new EngineerIntroductionService());

class PersonDIP {
  public introductionService: IntroductionService;

  constructor(introductionService: IntroductionService) {
    this.introductionService = introductionService;
  }
  public introduceSelf() {
    this.introductionService.introduce();
  }
}

const engineerDIP2 = new PersonDIP(new EngineerIntroductionService());
const musician = new PersonDIP(new MusicianIntroductionService());
