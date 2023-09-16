import { Injectable } from '@nestjs/common';
import { Book } from './book.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BookDto } from './book.model';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async getAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findById(id: string) {
    return this.bookModel.findById(id);
  }

  async createdBook(book: BookDto): Promise<Book> {
    const createdBook = await this.bookModel.create(book);
    return createdBook;
  }

  async updateBook(book: BookDto) {
    return await this.bookModel.findByIdAndUpdate(book._id, book);
  }

  async deleteBook(id: string) {
    return await this.bookModel.findByIdAndRemove(id);
  }
}
